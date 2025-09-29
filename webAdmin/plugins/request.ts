export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const $request = $fetch.create({
    baseURL: base_url,
    onRequest({ options }) {
      const token = useCookie('token');
      if (token.value) {
        options.headers = options.headers ?? {};
        (options.headers as any).token = token.value;
      }
    },
    onResponse({ response }) {
      if (response.status >= 200 && response.status < 300) {
        response._data = response._data ?? null;
      }
    },
    onRequestError({ request, error }) {},
    
    onResponseError(_context) {}
  });

  return {
    provide: {
      request: $request
    }
  };
});