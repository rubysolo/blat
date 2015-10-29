defmodule Blat.PostChannel do
  use Blat.Web, :channel

  def join("post:" <> post_id, message, socket) do
    # auth
    {:ok, socket}
  end

  def handle_in("message:new" = event, message, socket) do
    broadcast! socket, event, %{nick: message["nick"], message: message["message"]}
    {:noreply, socket}
  end
end
