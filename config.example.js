/*
  Copy this file to  config.js  and put your own values in.

  config.js is listed in .gitignore, so it never gets committed.
  This example file is the one that lives in the repo.

  Both values come from Supabase → Project Settings → API:
    url      the Project URL
    anonKey  the "anon public" key (NOT the service_role key)

  If config.js is missing the site still runs perfectly — every activity is
  browsable, and the Responses box just says it isn't connected yet.
*/

window.SONIC_CONFIG = {
  url:     "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR-ANON-PUBLIC-KEY"
};
