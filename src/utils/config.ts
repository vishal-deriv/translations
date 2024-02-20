export const domain_app_ids = {
  // these domains as supported "production domains"
  "deriv.app": 16929, // TODO: [app-link-refactor] - Remove backwards compatibility for `deriv.app`
  "app.deriv.com": 16929,
  "staging-app.deriv.com": 16303,
  "app.deriv.me": 1411,
  "staging-app.deriv.me": 1411, // TODO: setup staging for deriv.me
  "app.deriv.be": 30767,
  "staging-app.deriv.be": 31186,
  "binary.com": 1,
  "test-app.deriv.com": 51072,
} as const;

export const isProduction = (): boolean => {
  const all_domains = Object.keys(domain_app_ids).map(
    (domain) => `(www\\.)?${domain.replace(".", "\\.")}`
  );
  return new RegExp(`^(${all_domains.join("|")})$`, "i").test(
    window.location.hostname
  );
};

export const isStaging = () =>
  /staging-app\.deriv\.com/i.test(window.location.hostname);

export const isLocal = () =>
  /localhost(:\d+)?$/i.test(window.location.hostname);
