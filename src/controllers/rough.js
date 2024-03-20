// const folders = [
//   { name: "Folder1" },
//   { name: "Folder2" },
//   { name: "xyz", parent: "Folder1" },
//   { name: "abc", paent: "xyzz" },
// ];

// // Get folders/:Folder2
// const resposne = [
//   {
//     name: "Folder2",
//     children: [
//       {
//         name: "xyz",
//         children: [
//           {
//             name: "abc",
//           },
//         ],
//       },
//     ],
//   },
// ];

const folders = [
  { name: "Folder1" },
  { name: "Folder2" },
  { name: "xyz", parent: "Folder1" },
  { name: "abc", parent: "xyz" },
];

function getFolderStructure(folderName, folders) {
  const folder = folders.find((f) => f.name === folderName);
  if (!folder) return null;

  const result = { name: folder.name };
  const children = folders.filter((f) => f.parent === folderName);
  console.log({ children });

  if (children.length > 0) {
    result.children = children.map((child) =>
      getFolderStructure(child.name, folders)
    );
  }

  return result;
}

const result = getFolderStructure("Folder1", folders);
console.log(result);
