"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, PrinterIcon as Print, Calculator } from "lucide-react"
import Link from "next/link"

export default function MealSuspensionPage() {
  const [formData, setFormData] = useState({
    grade: "",
    class: "",
    seatNumber: "",
    suspensionCount: "",
    studentNames: [""],
    startDate: "",
    endDate: "",
    reason: "",
  })

  const [calculatedData, setCalculatedData] = useState({
    workingDays: 0,
    refundAmount: 0,
  })

  // 計算工作天數（排除週末和假期）
  const calculateWorkingDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    let workingDays = 0

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      const month = d.getMonth() + 1
      const day = d.getDate()

      // 排除週末
      if (dayOfWeek === 0 || dayOfWeek === 6) continue

      // 排除暑假 (7/1 - 8/20)
      if (month === 7 || (month === 8 && day <= 20)) continue

      // 排除寒假 (1/20 - 2/20)
      if ((month === 1 && day >= 20) || (month === 2 && day <= 20)) continue

      workingDays++
    }

    return workingDays
  }

  // 當日期或人數改變時重新計算
  useEffect(() => {
    const workingDays = calculateWorkingDays(formData.startDate, formData.endDate)
    const count = Number.parseInt(formData.suspensionCount) || 0
    const refundAmount = workingDays * count * 65

    setCalculatedData({
      workingDays,
      refundAmount,
    })
  }, [formData.startDate, formData.endDate, formData.suspensionCount])

  // 當停餐人數改變時調整姓名欄位
  useEffect(() => {
    const count = Number.parseInt(formData.suspensionCount) || 0
    const newNames = Array(Math.max(1, count))
      .fill("")
      .map((_, index) => formData.studentNames[index] || "")
    setFormData((prev) => ({ ...prev, studentNames: newNames }))
  }, [formData.suspensionCount])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 檢查申請日期是否符合3天前規定
    const today = new Date()
    const startDate = new Date(formData.startDate)
    const diffTime = startDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 3) {
      alert("停餐申請需提前3個工作天申請！")
      return
    }

    console.log("提交停餐申請:", formData, calculatedData)
    alert("停餐申請已提交！")
  }

  const handlePrint = () => {
    window.print()
  }

  // 設定最小申請日期（今天+3天）
  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 3)
    return today.toISOString().split("T")[0]
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
            <h1 className="text-xl font-bold">學童午餐停餐申請表</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>午餐停餐申請表</CardTitle>
            <CardDescription>請提前3個工作天申請，系統將自動計算退費金額</CardDescription>
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

              {/* 停餐人數 */}
              <div className="space-y-2">
                <Label htmlFor="suspensionCount">停餐人數</Label>
                <Select
                  value={formData.suspensionCount}
                  onValueChange={(value) => setFormData({ ...formData, suspensionCount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選擇停餐人數" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1人</SelectItem>
                    <SelectItem value="2">2人</SelectItem>
                    <SelectItem value="3">3人</SelectItem>
                    <SelectItem value="4">4人</SelectItem>
                    <SelectItem value="5">5人</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 學童姓名 */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">學童姓名</Label>
                {formData.studentNames.map((name, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`student-${index}`}>學童 {index + 1}</Label>
                    <Input
                      id={`student-${index}`}
                      placeholder={`學童姓名 ${index + 1}`}
                      value={name}
                      onChange={(e) => {
                        const newNames = [...formData.studentNames]
                        newNames[index] = e.target.value
                        setFormData({ ...formData, studentNames: newNames })
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* 停餐日期 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">停餐開始日期</Label>
                  <Input
                    id="startDate"
                    type="date"
                    min={getMinDate()}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">停餐結束日期</Label>
                  <Input
                    id="endDate"
                    type="date"
                    min={formData.startDate || getMinDate()}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* 計算結果 */}
              {calculatedData.workingDays > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      退費計算
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">停餐天數：</span>
                        <span className="font-semibold">{calculatedData.workingDays} 天</span>
                      </div>
                      <div>
                        <span className="text-gray-600">停餐人數：</span>
                        <span className="font-semibold">{formData.suspensionCount || 0} 人</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-blue-200">
                      <span className="text-gray-600">退費金額：</span>
                      <span className="text-lg font-bold text-blue-600">
                        NT$ {calculatedData.refundAmount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({calculatedData.workingDays} 天 × {formData.suspensionCount || 0} 人 × 65元)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 停餐原因 */}
              <div className="space-y-2">
                <Label htmlFor="reason">停餐原因</Label>
                <Textarea
                  id="reason"
                  placeholder="請說明停餐原因..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                />
              </div>

              {/* 按鈕 */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  提交申請
                </Button>
                <Button type="button" variant="outline" onClick={handlePrint}>
                  <Print className="h-4 w-4 mr-2" />
                  列印兩聯單
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
