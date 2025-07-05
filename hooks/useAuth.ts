/**
 * useAuth.ts
 *
 * This custom hook provides a convenient way to access the authentication context.
 * It simplifies consuming the AuthContext by abstracting away the 'useContext' call.
 * It also includes a check to ensure that the hook is used within the component tree
 * wrapped by an AuthProvider, throwing an error if it's not. This prevents common
 * runtime errors.
 */
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  // Get the context value.
  const context = useContext(AuthContext);
  
  // If the context is undefined, it means this hook is being used outside
  // of an AuthProvider. We throw an error to alert the developer.
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Return the context value, which includes the user, auth status, and functions.
  return context;
};
