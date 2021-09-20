import React, { useMemo } from 'react';
import './TableOfContents.scss';

export default function TableOfContents({ items, currentHeaderUrl }) {
    console.log(currentHeaderUrl)
    console.log(items)
    const replaceItems = useMemo(() => {
      if (currentHeaderUrl) {
        return items.replace(
          `"${currentHeaderUrl}"`,
          `"${currentHeaderUrl}" class=isCurrent"`
        );
      } else {
        return items;
      }
    }, [currentHeaderUrl]);
    return items ? (
      <nav className="table-of-contents">
        <h3 className="title">TABLE OF CONTENTS</h3>
        <div
          className="contents"
          dangerouslySetInnerHTML={{ __html: replaceItems }}
        />
      </nav>
    ) : null;
  }