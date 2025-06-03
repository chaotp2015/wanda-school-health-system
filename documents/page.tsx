import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function DocumentsPage() {
  const documents = [
    {
      title: "校園清掃區域班級分配圖表",
      description: "各班級負責清掃區域分配及責任範圍",
      type: "分配表",
      link: "#",
      updated: "2024-02-15",
    },
    {
      title: "督導人員配置表",
      description: "衛生組督導人員職責分工及聯絡方式",
      type: "配置表",
      link: "#",
      updated: "2024-02-10",
    },
    {
      title: "班級活動申請停餐表",
      description: "班級活動期間午餐停餐申請表格",
      type: "申請表",
      link: "#",
      updated: "2024-01-20",
    },
    {
      title: "資源回收施行計劃",
      description: "校園資源回收分類及執行計劃",
      type: "計劃書",
      link: "#",
      updated: "2024-01-15",
    },
    {
      title: "衛生檢查標準作業程序",
      description: "校園衛生檢查項目及評分標準",
      type: "作業程序",
      link: "#",
      updated: "2024-01-10",
    },
    {
      title: "營養午餐管理辦法",
      description: "學校營養午餐供應及管理相關規定",
      type: "管理辦法",
      link: "#",
      updated: "2024-01-05",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首頁
              </Button>
            </Link>
            <h1 className="text-xl font-bold">衛生組相關文件</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>文件管理說明</CardTitle>
              <CardDescription>
                所有衛生組相關文件均存放於 Google 雲端硬碟，點擊文件名稱即可開啟查看或下載。
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription className="mt-2">{doc.description}</CardDescription>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doc.type}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">更新日期：{doc.updated}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          開啟
                        </a>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        下載
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Google Drive 整合說明 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Google 雲端硬碟整合
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">文件存取權限</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 衛生組成員：完整編輯權限</li>
                    <li>• 班級導師：檢視及下載權限</li>
                    <li>• 學校行政：檢視權限</li>
                    <li>• 家長代表：特定文件檢視權限</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">文件管理</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 自動版本控制</li>
                    <li>• 即時協作編輯</li>
                    <li>• 變更歷史記錄</li>
                    <li>• 定期備份機制</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    前往 Google 雲端硬碟資料夾
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
