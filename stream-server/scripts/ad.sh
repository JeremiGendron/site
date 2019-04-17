#!/usr/bin/env bash
key=$1
current=$2

rm -rf out/
mkdir -p out/$key/$current

ffmpeg -analyzeduration 100 -re -y -i pipe:0 -c:v copy -c:a copy \
  -f hls -hls_time 0.333 -hls_playlist_type event out/$key/$current/out.m3u8

#-preset ultrafast -b:v 2000k -bufsize 2000k -r 30 -g 10 -tune zerolatency
