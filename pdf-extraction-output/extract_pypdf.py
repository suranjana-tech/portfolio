import sys
try:
 import pypdf
 r=pypdf.PdfReader(sys.argv[1])
 print("PYPDF_PAGES",len(r.pages))
 for p in r.pages: print(p.extract_text() or "")
except Exception as e: print("PYPDF_ERROR",type(e).__name__,str(e))
