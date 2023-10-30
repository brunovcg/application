export default function useTranslationPath<PathPrefixLiteral extends string>(defaultPrefixPath: PathPrefixLiteral) {
  function defaultPath<PathLiteral extends string>(path: PathLiteral): `${PathPrefixLiteral}.${PathLiteral}` {
    return `${defaultPrefixPath}.${path}`;
  }

  return defaultPath;
}
