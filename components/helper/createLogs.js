export const createLogs = (record) => {
  return (
    <b>
      <span>
        <span style={{ color: "#e74860" }}>{record?.userName}</span>
        <span style={{ color: "#0c3246" }}>
          {record?.type === "status" && " changed status to "}
          {record?.type === "Added" && " added an attachment "}
          {record?.type === "comment" && " added comment "}
          {record?.type === "deleted" && " deleted attachment "}
        </span>

        <span>
          {record?.type === "status" &&
            (record?.changed === "notStarted" ? (
              <span style={{ color: "orange" }}>not started</span>
            ) : record?.changed === "failed" ? (
              <span style={{ color: "red" }}>{record?.changed}</span>
            ) : (
              <span style={{ color: "green" }}>{record?.changed}</span>
            ))}
        </span>

        <span style={{ color: "#0000A3" }}>
          {record?.type === "Added" && record?.changed}
        </span>

        <span style={{ color: "#e74860" }}>
          {record?.type === "comment"
            ? record?.changed.length > 50
              ? '"' +
                record?.changed
                  .split("", 50)
                  .reduce(
                    (o, c) => (o.length === 49 ? `${o}${c}...` : `${o}${c}`),
                    ""
                  )
              : '"' + record?.changed + '"'
            : ""}
        </span>

        <span style={{ color: "#0000A3" }}>
          {record?.type === "deleted" && record?.changed}
        </span>
      </span>
    </b>
  );
};
