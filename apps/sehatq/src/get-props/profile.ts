export async function getProfileProps(arg: { isMobile: boolean }) {
  const { isMobile } = arg;
  return { isMobile };
}
