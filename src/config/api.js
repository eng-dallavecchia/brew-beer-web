export const handleAPIError = error => {
  if (error.error.content.request.status === 401) {
    window.location.replace("/");
  }
};
