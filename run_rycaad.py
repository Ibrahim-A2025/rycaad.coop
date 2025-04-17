
import webview
import os

file_path = os.path.abspath("admin-calendar.html")
webview.create_window("لوحة تحكم RYCAAD", f"file://{file_path}", width=1200, height=800)
webview.start()
