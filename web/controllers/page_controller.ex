defmodule Blat.PageController do
  use Blat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
