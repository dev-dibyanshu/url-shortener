import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShortUrls } from "../utils/storage";

const Redirector: React.FC = () => {
  const { shortCode } = useParams();
  useEffect(() => {
    const urls = getShortUrls();
    const found = urls.find((u: any) => u.shortCode === shortCode);
    if (found) {
      window.location.href = found.longUrl;
    }
  }, [shortCode]);
  return <div>Redirecting...</div>;
};

export default Redirector;
