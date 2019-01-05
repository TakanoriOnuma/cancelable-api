// APIルート
export const API_ROOT = (() => {
  if (process.env.NODE_ENV === 'development') {
    return `//${window.location.hostname}:12000`;
  }

  return `//${window.location.hostname}`;
})();
