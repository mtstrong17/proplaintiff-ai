'use client';

import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workspace/ui/components/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@workspace/ui/components/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import {
    AlertCircle,
    Download,
    Eye,
    FileText,
    Filter,
    FolderPlus,
    MoreHorizontal,
    Pencil,
    Search,
    Tags,
    Trash2,
    Upload,
    X
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type Document = {
  id: string;
  name: string;
  type: string;
  category: 'medical' | 'legal' | 'evidence' | 'correspondence' | 'billing';
  dateAdded: Date;
  lastModified: Date;
  size: string;
  tags: string[];
  status: 'draft' | 'final' | 'archived';
};

type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
};

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Initial Medical Report.pdf',
    type: 'pdf',
    category: 'medical',
    dateAdded: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    size: '2.4 MB',
    tags: ['medical', 'initial-assessment'],
    status: 'final',
  },
  {
    id: '2',
    name: 'Police Report.pdf',
    type: 'pdf',
    category: 'evidence',
    dateAdded: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    size: '1.8 MB',
    tags: ['police', 'incident'],
    status: 'final',
  },
  {
    id: '3',
    name: 'Client Statement.docx',
    type: 'docx',
    category: 'legal',
    dateAdded: new Date('2024-02-20'),
    lastModified: new Date('2024-03-01'),
    size: '156 KB',
    tags: ['statement', 'client'],
    status: 'final',
  },
  {
    id: '4',
    name: 'Medical Bills.pdf',
    type: 'pdf',
    category: 'billing',
    dateAdded: new Date('2024-03-10'),
    lastModified: new Date('2024-03-10'),
    size: '890 KB',
    tags: ['medical', 'billing'],
    status: 'final',
  },
  {
    id: '5',
    name: 'Settlement Draft.docx',
    type: 'docx',
    category: 'legal',
    dateAdded: new Date('2024-04-01'),
    lastModified: new Date('2024-04-05'),
    size: '245 KB',
    tags: ['settlement', 'draft'],
    status: 'draft',
  },
  {
    id: '6',
    name: 'Accident Scene Photos.jpg',
    type: 'jpg',
    category: 'evidence',
    dateAdded: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    size: '3.2 MB',
    tags: ['photos', 'accident', 'scene'],
    status: 'final',
  },
  {
    id: '7',
    name: 'Medical Diagram.png',
    type: 'png',
    category: 'medical',
    dateAdded: new Date('2024-03-05'),
    lastModified: new Date('2024-03-05'),
    size: '1.5 MB',
    tags: ['diagram', 'medical'],
    status: 'final',
  },
  {
    id: '8',
    name: 'Witness Statement.txt',
    type: 'txt',
    category: 'evidence',
    dateAdded: new Date('2024-02-18'),
    lastModified: new Date('2024-02-18'),
    size: '45 KB',
    tags: ['witness', 'statement'],
    status: 'final',
  },
  {
    id: '9',
    name: 'Traffic Camera Footage.mp4',
    type: 'mp4',
    category: 'evidence',
    dateAdded: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    size: '45 MB',
    tags: ['video', 'traffic', 'camera'],
    status: 'final',
  },
  {
    id: '10',
    name: 'Body Camera Recording.mov',
    type: 'mov',
    category: 'evidence',
    dateAdded: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    size: '32 MB',
    tags: ['video', 'body-camera'],
    status: 'final',
  },
  {
    id: '11',
    name: 'Insurance Correspondence.docx',
    type: 'docx',
    category: 'correspondence',
    dateAdded: new Date('2024-03-20'),
    lastModified: new Date('2024-03-20'),
    size: '180 KB',
    tags: ['insurance', 'correspondence'],
    status: 'final',
  },
  {
    id: '12',
    name: 'Medical Records Summary.pdf',
    type: 'pdf',
    category: 'medical',
    dateAdded: new Date('2024-03-25'),
    lastModified: new Date('2024-03-25'),
    size: '2.1 MB',
    tags: ['medical', 'records', 'summary'],
    status: 'final',
  },
];

const sampleFolders: Folder[] = [
  {
    id: 'root',
    name: 'Case Documents',
    parentId: null,
    documents: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'medical',
    name: 'Medical Records',
    parentId: 'root',
    documents: ['1', '4', '7', '12'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: 'evidence',
    name: 'Evidence',
    parentId: 'root',
    documents: ['2', '6', '8', '9', '10'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'legal',
    name: 'Legal Documents',
    parentId: 'root',
    documents: ['3', '5'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: 'correspondence',
    name: 'Correspondence',
    parentId: 'root',
    documents: ['11'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'medical-reports',
    name: 'Medical Reports',
    parentId: 'medical',
    documents: ['1', '12'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: 'medical-bills',
    name: 'Medical Bills',
    parentId: 'medical',
    documents: ['4'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: 'medical-imaging',
    name: 'Medical Imaging',
    parentId: 'medical',
    documents: ['7'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: 'police-reports',
    name: 'Police Reports',
    parentId: 'evidence',
    documents: ['2'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'photos',
    name: 'Photos',
    parentId: 'evidence',
    documents: ['6'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'videos',
    name: 'Videos',
    parentId: 'evidence',
    documents: ['9', '10'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'statements',
    name: 'Statements',
    parentId: 'evidence',
    documents: ['8'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-18'),
  },
];

const categoryColors = {
  medical: 'text-rose-500 bg-rose-50',
  legal: 'text-blue-500 bg-blue-50',
  evidence: 'text-amber-500 bg-amber-50',
  correspondence: 'text-purple-500 bg-purple-50',
  billing: 'text-green-500 bg-green-50',
};

type UploadingFile = {
  id: string;
  file: File;
  category: Document['category'];
  progress: number;
  error?: string;
};

type ListItem = {
  id: string;
  name: string;
  type: 'folder' | 'document';
  category?: Document['category'];
  dateAdded: Date;
  lastModified: Date;
  size?: string;
  tags?: string[];
  status?: Document['status'];
  parentId?: string | null;
  documents?: string[];
};

export function CaseDocuments() {
  const [selectedCategory, setSelectedCategory] = useState<Document['category'] | 'all'>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Document['status'] | 'all'>('all');
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [folderPath, setFolderPath] = useState<Folder[]>([]);
  const [folders, setFolders] = useState<Folder[]>(sampleFolders);
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [newFolderName, setNewFolderName] = useState('');
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [itemToMove, setItemToMove] = useState<ListItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ListItem | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      category: 'legal' as Document['category'],
      progress: 0,
    }));
    setUploadingFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  const removeUploadingFile = (fileId: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const updateFileCategory = (fileId: string, category: Document['category']) => {
    setUploadingFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, category } : f)));
  };

  const handleUpload = async () => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadingFiles((prev) => prev.map((f) => ({ ...f, progress })));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setUploadDialogOpen(false);
    setUploadingFiles([]);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    const items = getListItems();
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: Math.random().toString(36).substring(7),
      name: newFolderName.trim(),
      parentId: currentFolder,
      documents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setNewFolderDialogOpen(false);
  };

  const getCurrentFolder = () => {
    return folders.find(folder => folder.id === currentFolder);
  };

  const getFolderPath = (folderId: string) => {
    const path: Folder[] = [];
    let currentId = folderId;
    
    while (currentId) {
      const folder = folders.find(f => f.id === currentId);
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId || '';
      } else {
        break;
      }
    }
    
    return path;
  };

  const getSubfolders = (folderId: string) => {
    return folders.filter(folder => folder.parentId === folderId);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
    setFolderPath(getFolderPath(folderId));
  };

  const getListItems = (): ListItem[] => {
    const currentFolderData = getCurrentFolder();
    const subfolders = getSubfolders(currentFolder);
    const folderDocuments = documents.filter(doc => currentFolderData?.documents.includes(doc.id));

    return [
      ...subfolders.map(folder => ({
        id: folder.id,
        name: folder.name,
        type: 'folder' as const,
        dateAdded: folder.createdAt,
        lastModified: folder.updatedAt,
        parentId: folder.parentId,
        documents: folder.documents
      })),
      ...folderDocuments.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: 'document' as const,
        category: doc.category,
        dateAdded: doc.dateAdded,
        lastModified: doc.lastModified,
        size: doc.size,
        tags: doc.tags,
        status: doc.status
      }))
    ];
  };

  const handleItemClick = (item: ListItem) => {
    if (item.type === 'folder') {
      handleFolderClick(item.id);
    } else {
      // Handle document click
      console.log('Document clicked:', item.id);
    }
  };

  const filteredItems = getListItems()
    .filter((item) => {
      if (item.type === 'document') {
        return (
          (selectedCategory === 'all' || item.category === selectedCategory) &&
          (statusFilter === 'all' || item.status === statusFilter) &&
          (searchQuery === '' ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))))
        );
      }
      return searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const hasActiveFilters = selectedCategory !== 'all' || statusFilter !== 'all';

  const handleDownloadDocument = (documentId: string) => {
    // TODO: Implement document download
    console.log('Download document:', documentId);
  };

  const handleShareDocument = (documentId: string) => {
    // TODO: Implement document sharing
    console.log('Share document:', documentId);
  };

  const handleDeleteItem = (item: ListItem) => {
    if (item.type === 'folder') {
      // Delete folder and its contents
      setFolders(prev => prev.filter(f => f.id !== item.id));
      // Remove folder from parent's documents array
      setFolders(prev => prev.map(f => ({
        ...f,
        documents: f.documents.filter(docId => docId !== item.id)
      })));
    } else {
      // Delete document
      setDocuments(prev => prev.filter(d => d.id !== item.id));
      // Remove document from all folders
      setFolders(prev => prev.map(f => ({
        ...f,
        documents: f.documents.filter(docId => docId !== item.id)
      })));
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleMoveItem = (item: ListItem, targetFolderId: string) => {
    if (item.type === 'folder') {
      // Move folder
      setFolders(prev => prev.map(f => {
        if (f.id === item.id) {
          return { ...f, parentId: targetFolderId };
        }
        return f;
      }));
    } else {
      // Move document
      // Remove from current folder
      setFolders(prev => prev.map(f => {
        if (f.id === currentFolder) {
          return {
            ...f,
            documents: f.documents.filter(docId => docId !== item.id)
          };
        }
        return f;
      }));
      // Add to target folder
      setFolders(prev => prev.map(f => {
        if (f.id === targetFolderId) {
          return {
            ...f,
            documents: [...f.documents, item.id]
          };
        }
        return f;
      }));
    }
    setMoveDialogOpen(false);
    setItemToMove(null);
  };

  const handleBulkDelete = () => {
    const itemsToDelete = filteredItems.filter(item => selectedItems.includes(item.id));
    itemsToDelete.forEach(item => handleDeleteItem(item));
    setSelectedItems([]);
  };

  const handleBulkMove = () => {
    const itemsToMove = filteredItems.filter(item => selectedItems.includes(item.id));
    if (itemsToMove.length > 0) {
      const firstItem = itemsToMove[0];
      if (firstItem) {
        setItemToMove(firstItem);
        setMoveDialogOpen(true);
      }
    }
  };

  const handleEditDocument = (documentId: string) => {
    // TODO: Implement document editing
    console.log('Edit document:', documentId);
  };

  const handleEditTags = (documentId: string) => {
    // TODO: Implement tag editing
    console.log('Edit tags:', documentId);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Folder Navigation */}
        <div className="flex items-center gap-2 text-sm">
          {folderPath.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <button
                onClick={() => handleFolderClick(folder.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {folder.name}
              </button>
              {index < folderPath.length - 1 && (
                <span className="text-muted-foreground">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Dialog
              open={uploadDialogOpen}
              onOpenChange={(open) => {
                setUploadDialogOpen(open);
                if (!open) setUploadingFiles([]);
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Upload Documents</DialogTitle>
                  <DialogDescription>
                    Upload one or more documents to the case file. Supported formats: PDF, DOC,
                    DOCX, JPG, PNG
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  <div
                    {...getRootProps()}
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition-colors
                      ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted'}
                      hover:border-primary hover:bg-primary/5
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      {isDragActive ? (
                        <p>Drop the files here...</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium">
                            Drag & drop files here, or click to select files
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, DOC, DOCX, JPG, PNG (max 10MB each)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {uploadingFiles.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Selected Files</h4>
                      <div className="space-y-2">
                        {uploadingFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-4 rounded-lg border p-3"
                          >
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium truncate">{file.file.name}</p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeUploadingFile(file.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <Select
                                  value={file.category}
                                  onValueChange={(value) =>
                                    updateFileCategory(file.id, value as Document['category'])
                                  }
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="medical">Medical</SelectItem>
                                    <SelectItem value="legal">Legal</SelectItem>
                                    <SelectItem value="evidence">Evidence</SelectItem>
                                    <SelectItem value="correspondence">Correspondence</SelectItem>
                                    <SelectItem value="billing">Billing</SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              {file.progress > 0 && (
                                <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                              )}
                              {file.error && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-red-500">
                                  <AlertCircle className="h-4 w-4" />
                                  {file.error}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} disabled={uploadingFiles.length === 0}>
                    Upload {uploadingFiles.length > 0 && `(${uploadingFiles.length} files)`}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Enter a name for the new folder in {getCurrentFolder()?.name || 'Case Documents'}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input
                      id="name"
                      placeholder="Folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateFolder();
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                  >
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkMove}
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Move
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:text-red-600"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px] pl-9"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && <span className="ml-2 rounded-full bg-primary w-2 h-2" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px]">
                <div className="grid gap-4 p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Category</h4>
                    <Select
                      value={selectedCategory}
                      onValueChange={(value) =>
                        setSelectedCategory(value as Document['category'] | 'all')
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="medical">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            Medical
                          </div>
                        </SelectItem>
                        <SelectItem value="legal">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Legal
                          </div>
                        </SelectItem>
                        <SelectItem value="evidence">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            Evidence
                          </div>
                        </SelectItem>
                        <SelectItem value="correspondence">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            Correspondence
                          </div>
                        </SelectItem>
                        <SelectItem value="billing">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Billing
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Status</h4>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as Document['status'] | 'all')
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="draft">
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                              Draft
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="final">
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                              Final
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="archived">
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
                              Archived
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory('all');
                        setStatusFilter('all');
                      }}
                      disabled={!hasActiveFilters}
                    >
                      Reset filters
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        // Apply filters - in this case, they're already applied
                        // but you might want to add additional logic here
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow 
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleItemClick(item)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.type === 'folder' ? (
                        <FolderPlus className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.type === 'document' && item.category && (
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}
                      >
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.dateAdded.toLocaleDateString()}</TableCell>
                  <TableCell>{item.lastModified.toLocaleDateString()}</TableCell>
                  <TableCell>{item.type === 'document' ? item.size : '-'}</TableCell>
                  <TableCell>
                    {item.type === 'document' && item.status && (
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${
                          item.status === 'draft'
                            ? 'bg-yellow-50 text-yellow-600'
                            : item.status === 'final'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {item.type === 'document' ? (
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/case/documents/${item.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>View document</TooltipContent>
                        </Tooltip>

                        <DropdownMenu>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>More actions</TooltipContent>
                          </Tooltip>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleDownloadDocument(item.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setItemToMove(item);
                              setMoveDialogOpen(true);
                            }}>
                              <FolderPlus className="mr-2 h-4 w-4" />
                              Move
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditDocument(item.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditTags(item.id)}>
                              <Tags className="mr-2 h-4 w-4" />
                              Edit Tags
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setItemToDelete(item);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>More actions</TooltipContent>
                          </Tooltip>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => {
                              setItemToMove(item);
                              setMoveDialogOpen(true);
                            }}>
                              <FolderPlus className="mr-2 h-4 w-4" />
                              Move
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setItemToDelete(item);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Move Dialog */}
        <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Move {itemToMove?.type === 'folder' ? 'Folder' : 'Document'}</DialogTitle>
              <DialogDescription>
                Select a destination folder for {itemToMove?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Select
                  onValueChange={(value) => {
                    if (itemToMove) {
                      handleMoveItem(itemToMove, value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders
                      .filter(f => f.id !== itemToMove?.id && f.id !== currentFolder)
                      .map(folder => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMoveDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {itemToDelete?.type === 'folder' ? 'Folder' : 'Document'}</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {itemToDelete?.name}?
                {itemToDelete?.type === 'folder' && ' This will also delete all contents of the folder.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  if (itemToDelete) {
                    handleDeleteItem(itemToDelete);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
