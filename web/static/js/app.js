// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

import {Socket} from "deps/phoenix/web/static/js/phoenix"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

class App {
  static init() {
    let nick = $("#nick")
    let message = $("#message")

    message.off("keypress")
           .on("keypress", e => {
             if (e.keyCode == 13) {
               channel.push("message:new", {
                 nick: nick.val(),
                 message: message.val(),
               })
               message.val("")
             }
           })

    let socket = new Socket("/socket")

    socket.connect()

    // Now that you are connected, you can join channels with a topic:
    let channelId = `post:${window.__post_id}`
    let channel = socket.channel(channelId, {})
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("message:new", msg => this.renderMessage(msg))

  }

  static renderMessage(msg) {
    $("#messages").append(`<p><b>[${this.sanitize(msg.nick)}]</b>: ${this.sanitize(msg.message)}</p>`)
  }

  static sanitize(text) {
    return $("<div/>").text(text).html()
  }
}

$( () => App.init() )

export default App
