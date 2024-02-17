import { ChatbotPageProvider } from "./context";

// HOC to provide context
const withProviders = (WrappedComponent: any) => {
  const WithProviders = (props: any) => {
    return (
      <ChatbotPageProvider>
        <WrappedComponent {...props} />
      </ChatbotPageProvider>
    );
  };

  return WithProviders;
};

// Component that uses the hook
const SingleChatbotPageLayout = ({ children }: any) => {
  return <>{children}</>;
};

// Wrap the component with the HOC
export default withProviders(SingleChatbotPageLayout);
