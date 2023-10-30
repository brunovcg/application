abstract class ClipboardHelper {
  static copy(value: string) {
    navigator.clipboard.writeText(value);
  }

  static read() {
    navigator.clipboard.read();
  }
}

export default ClipboardHelper;
