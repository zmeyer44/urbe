import React from "react";
export function useContextSafely<T>(context: React.Context<T>): NonNullable<T> {
  const value = React.useContext(context);
  if (value == null) {
    throw new Error(
      `${context.displayName} cannot be used outside of provider`,
    );
  }
  return value as NonNullable<T>;
}
