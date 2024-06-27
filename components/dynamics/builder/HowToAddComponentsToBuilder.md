# To Add a Component to Page Builder Follow These Steps Carefully

1 - First Make a New Folder in The Builder Component Found in The Dynamics Folder.

2 - Make 2 Typescript React Components in The New Folder, One for The Component Itself and The Other for The Component's Settings and Edit Options.

3 - Locate The PageBuilder.tsx and Make The Related Save Function For The Page Builder and Add it to The ComponentsSaveFuntions Array in The PageBuilder.tsx.

## Rules

- Component Need to Be in a Way That Follow Server Side Rendering in Next JS unless it absoultly can't be done.

- All Components Editors Need to Have Some Common Props Which are - > onSave , previousContent , previousStyles

- Components Need to Have Some Common Props Which are - > content => {
  Content can be Object or Simple Strings or Any Type Of Data Which is Needed to Render The Component.
  } styles => {
  Styles can be Object or Simple Strings or Any Type Of Data Which is Needed to Render The Component.
  },
