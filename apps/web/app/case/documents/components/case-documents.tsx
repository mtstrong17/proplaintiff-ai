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
  Share2,
  Tags,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import Link from 'next/link';
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

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Initial Medical Report.pdf',
    type: 'PDF',
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
    type: 'PDF',
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
    type: 'DOCX',
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
    type: 'PDF',
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
    type: 'DOCX',
    category: 'legal',
    dateAdded: new Date('2024-04-01'),
    lastModified: new Date('2024-04-05'),
    size: '245 KB',
    tags: ['settlement', 'draft'],
    status: 'draft',
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

export function CaseDocuments() {
  const [selectedCategory, setSelectedCategory] = useState<Document['category'] | 'all'>('all');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Document['status'] | 'all'>('all');

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

  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === sampleDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(sampleDocuments.map((doc) => doc.id));
    }
  };

  const filteredDocuments = sampleDocuments
    .filter((doc) => selectedCategory === 'all' || doc.category === selectedCategory)
    .filter((doc) => statusFilter === 'all' || doc.status === statusFilter)
    .filter(
      (doc) =>
        searchQuery === '' ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const hasActiveFilters = selectedCategory !== 'all' || statusFilter !== 'all';

  const handleDownloadDocument = (documentId: string) => {
    // TODO: Implement document download
    console.log('Download document:', documentId);
  };

  const handleShareDocument = (documentId: string) => {
    // TODO: Implement document sharing
    console.log('Share document:', documentId);
  };

  const handleDeleteDocument = (documentId: string) => {
    // TODO: Implement document deletion
    console.log('Delete document:', documentId);
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
                  <DialogDescription>Enter a name for the new folder.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input id="name" placeholder="Folder name" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {selectedDocuments.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
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
            {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedDocuments.length === sampleDocuments.length}
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
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedDocuments.includes(doc.id)}
                      onCheckedChange={() => handleSelectDocument(doc.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Link href={`/case/documents/${doc.id}`} className="hover:underline">
                        {doc.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[doc.category]}`}
                    >
                      {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>{doc.dateAdded.toLocaleDateString()}</TableCell>
                  <TableCell>{doc.lastModified.toLocaleDateString()}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${
                        doc.status === 'draft'
                          ? 'bg-yellow-50 text-yellow-600'
                          : doc.status === 'final'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/case/documents/${doc.id}`}>
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
                          <DropdownMenuItem onClick={() => handleDownloadDocument(doc.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareDocument(doc.id)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditDocument(doc.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditTags(doc.id)}>
                            <Tags className="mr-2 h-4 w-4" />
                            Edit Tags
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
