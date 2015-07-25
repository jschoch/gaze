defmodule Gaze.FooChannel do
  use Phoenix.Channel
  require Logger
  def join("foo", _msg, socket) do
    Logger.info("joined foo")
    #send self, :update
    send self, :welcome
    {:ok, socket}
  end
  def handle_info(:welcome,socket) do
    Logger.info("Welcome found")
    push socket, "msg", %{
      "from" => "system",
      "msg" => "sup"
    }
    {:noreply, socket}
  end
  def handle_info(:msg,socket) do
    Logger.info("handle_info: " ++ inspect socket)
    {:noreply, socket}
  end
  def handle_info(:msg,map,socket) do
    Logger.info inspect {map,socket}
    {:noreply, socket}
  end

  def handle_info("msg",%{"from" => from} = msg,socket) do
    Logger.info("handle_info: " ++ inspect msg ++ "socket" ++ inspect socket)
    {:noreply, socket}
  end
  def handle_in("msg",map,socket) do
    Logger.info inspect {map,socket}
    broadcast! socket, "msg",map
    {:noreply, socket}
  end
  def handle_in("phx_join",map,socket) do
    Logger.info("phx_join socket #{inspect socket}")
    {:noreply, socket}
  end

end
