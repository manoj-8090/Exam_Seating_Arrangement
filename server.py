"""
Zero-Dependency Python Server
Runs out of the box with `python server.py` - No pip install required!
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = int(os.environ.get("PORT", 8000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == "__main__":
    url = f"http://localhost:{PORT}/index.html"
    print("\n" + "=" * 50)
    print("Exam Seating Arrangement Server running!")
    print(f"URL: {url}")
    print("Press Ctrl+C to stop.")
    print("=" * 50 + "\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)
