# ivangabriele/tauri 
# This is docker image for tauri.
# This made of debian bookworm (Debian 12.x).
# it used Node.js 18.x.
FROM ivangabriele/tauri:debian-bookworm-18-nightly

# 日本語環境
RUN apt update && apt -y install task-japanese locales-all

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn add vite
RUN yarn add -D @tauri-apps/cli
RUN yarn
