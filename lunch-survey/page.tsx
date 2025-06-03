"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Download } from "lucide-react"
import Link from "next/link"

export default function HealthRecordsPage() {
  const [formData, setFormData] = useState({
    grade: "",
    class: "",
    seatNumber: "",
    studentId: "",
    studentName: "",
    height: "",
    weight: "",
    visionLeft: "",
    visionRight: "",
    recordDate: new Date().toISOString().split("T")[0],
  })

  const [bmi, setBmi] = useState<number | null>(null)

  const calculateBMI = () => {
    const height = Number.parseFloat(formData.height)
    const weight = Number.parseFloat(formData.weight)

    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100
      const calculatedBMI = weight / (heightInMeters * heightInMeters)
      setBmi(Math.round(calculatedBMI * 100) / 100)
    } else {
      setBmi(null)
    }
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "體重過輕", color: "text-blue-600" }
    if (bmi < 24) return { status: "正常範圍", color: "text-green-600" }
    if (bmi < 27) return { status: "體重過重", color: "text-yellow-600" }
    return { status: "肥胖", color: "text-red-600" }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交健康記錄:", formData, { bmi })
    alert("健康記錄已提交！")
  }

  const handleExport = () => {
    console.log("匯出健康記錄")
    alert("健康記錄已匯出！")
  }

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
            <h1 className="text-xl font-bold">學童身高體重視力填報系統</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>健康數據填報</CardTitle>
            <CardDescription>記錄學童身高、體重、視力等健康數據</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本資料 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">年級</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇年級" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">一年級</SelectItem>
                      <SelectItem value="2">二年級</SelectItem>
                      <SelectItem value="3">三年級</SelectItem>
                      <SelectItem value="4">四年級</SelectItem>
                      <SelectItem value="5">五年級</SelectItem>
                      <SelectItem value="6">六年級</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">班級</Label>
                  <Input
                    id="class"
                    placeholder="班級"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seatNumber">座號</Label>
                  <Input
                    id="seatNumber"
                    placeholder="座號"
                    value={formData.seatNumber}
                    onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">學號</Label>
                  <Input
                    id="studentId"
                    placeholder="學號"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName">學童姓名</Label>
                  <Input
                    id="studentName"
                    placeholder="學童姓名"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                </div>
              </div>

              {/* 身高體重 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">身高 (公分)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="身高"
                    value={formData.height}
                    onChange={(e) => {
                      setFormData({ ...formData, height: e.target.value })
                      setTimeout(calculateBMI, 100)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">體重 (公斤)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="體重"
                    value={formData.weight}
                    onChange={(e) => {
                      setFormData({ ...formData, weight: e.target.value })
                      setTimeout(calculateBMI, 100)
                    }}
                  />
                </div>
              </div>

              {/* BMI 顯示 */}
              {bmi && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">BMI 值：</span>
                      <div className="text-right">
                        <span className="text-lg font-bold">{bmi}</span>
                        <span className={`ml-2 text-sm font-semibold ${getBMIStatus(bmi).color}`}>
                          {getBMIStatus(bmi).status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 視力 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visionLeft">左眼視力</Label>
                  <Select
                    value={formData.visionLeft}
                    onValueChange={(value) => setFormData({ ...formData, visionLeft: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇視力" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="1.2">1.2</SelectItem>
                      <SelectItem value="1.0">1.0</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.1">0.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visionRight">右眼視力</Label>
                  <Select
                    value={formData.visionRight}
                    onValueChange={(value) => setFormData({ ...formData, visionRight: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇視力" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="1.2">1.2</SelectItem>
                      <SelectItem value="1.0">1.0</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.1">0.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 記錄日期 */}
              <div className="space-y-2">
                <Label htmlFor="recordDate">記錄日期</Label>
                <Input
                  id="recordDate"
                  type="date"
                  value={formData.recordDate}
                  onChange={(e) => setFormData({ ...formData, recordDate: e.target.value })}
                />
              </div>

              {/* 按鈕 */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  儲存記錄
                </Button>
                <Button type="button" variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  匯出報表
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
