import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  console.log(name)
  console.log(navigationRef.isReady())
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    console.log(name)
  }
}

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}