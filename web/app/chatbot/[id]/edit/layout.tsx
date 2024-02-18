import { ChatbotEditPageProvider } from "./context";

// HOC to provide context
const withProviders = (WrappedComponent: any) => {
  const WithProviders = (props: any) => {
    return (
      <ChatbotEditPageProvider>
        <WrappedComponent {...props} />
      </ChatbotEditPageProvider>
    );
  };

  return WithProviders;
};

// Component that uses the hook
const EditChatbotPageLayout = ({ children }: any) => {
  return <>{children}</>;
};

// Wrap the component with the HOC
export default withProviders(EditChatbotPageLayout);
