import React from "react";
export function AuthButton({ handleLogin, email, loading }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleLogin(email);
      }}
      className="button block"
      disabled={loading}
    >
      <span>{loading ? "Loading" : "Send magic link"}</span>
    </button>
  );
}
