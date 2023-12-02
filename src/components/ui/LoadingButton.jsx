import React from "react";

export default function LoadingButton({ isLoading = false, children }) {
  return (
    <button type="submit" className="btn btn-primary w-full mt-5">
      {isLoading ? (
        <span className="loading loading-spinner text-white"></span>
      ) : (
        children
      )}
    </button>
  );
}
