import React from "react";

export default function Label({ name }) {
  return (
    <div className="form-control w-full">
      <label className="label pb-1">
        <span className="label-text font-medium text-gray-500">{name}</span>
      </label>
    </div>
  );
}
