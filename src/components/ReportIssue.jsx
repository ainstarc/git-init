import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ReportIssue({
  commandId,
  commandDescription,
  commandExample,
  commandKeywords,
  commandCategory,
}) {
  // Construct the issue URL with the command details
  const baseUrl = "https://github.com/ainstarc/git-init/issues/new";
  const title = encodeURIComponent(`Issue with Git command: ${commandId}`);
  const body = encodeURIComponent(
    `### Describe the issue\n\n(Explain what’s wrong or could be improved)\n\n---\n**Command ID:** ${commandId}\n**CommandDescription:** ${commandDescription}\n**Command Example:** ${commandExample}\n**Command Keywords:** ${commandKeywords.join(
      ", "
    )}\n**Command Category:** ${commandCategory}\n
    `
  );

  const issueUrl = `${baseUrl}?title=${title}&body=${body}`;

  return (
    <a
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Report an issue with this command"
      className="report-issue-icon"
    >
      <AlertTriangle className="icon" />
    </a>
  );
}
