-module(erlChat).
-export([start/0]).
-export([init/3, handle/2, terminate/3]).

start() ->
    Port = 8089,
    ok = application:start(xmerl),
    ok = application:start(sockjs),
    ok = application:start(ranch),
    ok = application:start(crypto),   
    ok = application:start(cowlib), 
    ok = application:start(cowboy),
    ok = application:start(asn1),
    ok = application:start(public_key),
    ok = application:start(ssl),

	StateEcho = sockjs_handler:init_state(
                  <<"/echo">>, fun service_echo/3, state,
                  [{response_limit, 4096}]),
    StateChat = sockjs_handler:init_state(
                  <<"/chat">>, fun service_chat/3, state,[]),
    StateClose = sockjs_handler:init_state(
                   <<"/close">>, fun service_close/3, state, []),
    StateBroadcast = sockjs_handler:init_state(
                       <<"/broadcast">>, fun service_broadcast/3, state, []),

    VRoutes = [
               {<<"/echo/[...]">>, sockjs_cowboy_handler, StateEcho},
               {<<"/chat/[...]">>, sockjs_cowboy_handler, StateChat},
               {<<"/close/[...]">>, sockjs_cowboy_handler, StateClose},
               {<<"/broadcast/[...]">>, sockjs_cowboy_handler, StateBroadcast},
               {'_', ?MODULE, []}],
    Routes = [{'_',  VRoutes}], % any vhost
    Dispatch = cowboy_router:compile(Routes),

    io:format("http://localhost:~p~n", [Port]),

    cowboy:start_http(cowboy_test_server_http_listener, 100, 
                      [{port, Port}],
                      [{env, [{dispatch, Dispatch}]}]),
    receive
        _ -> ok
    end.

%% --------------------------------------------------------------------------

init({_Any, http}, Req, []) ->
    {ok, Req, []}.

handle(Req, State) ->
    Path = bitstring_to_list(element(1,cowboy_req:path(Req))),
    case Path of
        "/" ->
            {ok, Data} = file:read_file("./priv/www/index.html"),
            {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "text/html"}],Data, Req),
            {ok, Req1, State};
        _ ->
            Path_Final = "./priv/www" ++ Path ,
            {ok, Data} = readrequestfile(Path_Final),
            case lists:last(string:tokens(Path, ".")) of
               "js" ->
                    {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "text/javascript"}],Data, Req),
                    {ok, Req1, State};
                "css" ->
                    {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "text/css"}],Data, Req),
                    {ok, Req1, State};
                "map" ->
                    {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "text/css"}],Data, Req),
                    {ok, Req1, State};
                "ico" ->
                    {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "image/x-icon"}],Data, Req),
                    {ok, Req1, State};
                _ ->
                    {ok, Req1} = cowboy_req:reply(200, [{<<"Content-Type">>, "text/html"}],Data, Req),
                    {ok, Req1, State}
            end
    end.
    
readrequestfile(Path_Final) ->
    case file:read_file(Path_Final) of 
        {ok, Data} ->
            {ok, Data};
        {error,_} ->
            {ok, ""}
    end.  

terminate(_Reason, _Req, _State) ->
    ok.

service_close(Conn, _, _State) ->
    Conn:close(3000, "Go away!").

service_echo(_Conn, init, state)        -> {ok, state};
service_echo(Conn, {recv, Data}, state) -> Conn:send(Data);
service_echo(_Conn, {info, _Info}, state) -> {ok, state};
service_echo(_Conn, closed, state)      -> {ok, state}.


service_broadcast(Conn, init, _State) ->
    case ets:info(broadcast_table, memory) of
        undefined ->
            ets:new(broadcast_table, [public, named_table]);
        _Any ->
            ok
    end,
    true = ets:insert(broadcast_table, {Conn}),
    ok;
service_broadcast(Conn, closed, _State) ->
    true = ets:delete_object(broadcast_table, {Conn}),
    ok;
service_broadcast(_Conn, {recv, Data}, _State) ->
    ets:foldl(fun({Conn1}, _Acc) -> Conn1:send(Data) end,
              [], broadcast_table),
    ok.


service_chat(_Conn, init, state) -> 
  {ok, state};
service_chat(Conn, {recv, Data}, state) -> 
  Conn:send(Data);
service_chat(_Conn, {info, _Info}, state) -> 
  {ok, state};
service_chat(_Conn, closed, state) -> 
  {ok, state}.