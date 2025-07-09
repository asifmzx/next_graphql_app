import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function withClientOnly(Component) {
  return function ClientOnlyComponent(props) {
    const isClient = useIsClient();

    if (!isClient) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
export function ClientOnly({ children, fallback = <div>Loading...</div> }) {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback;
  }

  return children;
}
