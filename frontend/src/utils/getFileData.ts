// components
import { CustomFile } from '../components/upload/type';

// ----------------------------------------------------------------------

export default function getFileData(file: CustomFile | string, index?: number) {
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    };
  }

  return {
    key: index ? `${file.name}-${index}` : file.name,
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };
}
