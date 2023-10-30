abstract class AuthenticationConfigs {
  static validTimeLastLogin = {
    value: 6,
    unit: 'hours',
  } as const;
}

export default AuthenticationConfigs;
