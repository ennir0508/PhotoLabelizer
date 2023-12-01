# ivangabriele/tauri 
# This is docker image for tauri.
# This made of debian bookworm (Debian 12.x).
# it used Node.js 18.x.
FROM ivangabriele/tauri:debian-bookworm-18-nightly

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn

