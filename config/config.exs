# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :gaze, Gaze.Endpoint,
  url: [host: "stink.net"],
  root: Path.expand("..", __DIR__),
  secret_key_base: "QAAuiGBL355S8u1QTnWNttvb/S6PHssuKbK0MDHsvnxb3DI4GjwmIcKpDUReG7lK",
  debug_errors: false,
  pubsub: [name: Gaze.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
