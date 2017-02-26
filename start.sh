#!/bin/sh
erl +pc unicode -pa $PWD/ebin $PWD/deps/*/ebin $NOSHELL -s erlChat  -sname erlChat_dev

