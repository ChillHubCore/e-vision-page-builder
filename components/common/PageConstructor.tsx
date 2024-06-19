import React from "react";
import { PageContext } from "./PageBuilder";
import { ComponentList } from "../dynamics/builder";

export default function PageConstructor({
  PageContext,
}: {
  PageContext: PageContext;
}) {
  return (
    <div>
      {PageContext.Components.map((c) => {
        const Component = ComponentList.find((cl) => cl.name === c.name);
        if (!Component) return null;
        return (
          <div key={c.name} className="my-5">
            <Component.component {...c.props} />
          </div>
        );
      })}
    </div>
  );
}
