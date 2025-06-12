function ContentContainer({ children }) {
  return (
    <div className="max-w-screen-lg w-full mx-auto px-6 py-12 bg-white rounded shadow-sm">
      {children}
    </div>
  );
}

export default ContentContainer;
