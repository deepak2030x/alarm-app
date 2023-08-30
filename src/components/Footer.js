const fontStyleFooter = {
  fontSize: `${30}px`,
  marginTop: `${20}px`,
  marginBottom: `${20}px`,
  textAlign: "center",
};
function Footer() {
  return (
    <>
      <footer style={fontStyleFooter}>
        <p>
          Coded By{" "}
          <a
            href="https://www.linkedin.com/in/deepak2030x/"
            target="_blank"
            rel="noreferrer"
          >
            Deepak
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
