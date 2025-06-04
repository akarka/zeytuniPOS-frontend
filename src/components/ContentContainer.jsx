function ContentContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
