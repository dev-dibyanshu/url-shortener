export function saveShortUrl(urls: any[]) {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }
  
  export function getShortUrls() {
    const data = localStorage.getItem("shortUrls");
    return data ? JSON.parse(data) : [];
  }
  