export class DataSourceUtils {
  static s3PdfPath(publicId: string) {
    return `pdf/${publicId}.pdf`;
  }

  static transcriptS3Path(publicId: string) {
    return `transcripts/${publicId}.txt`;
  }

  static modelS3OutPath(publicId: string) {
    return `models/${publicId}`;
  }
}
