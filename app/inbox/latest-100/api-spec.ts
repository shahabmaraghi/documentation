export const latest100ApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "100 پیام آخر - Ghasedak SMS API",
    version: "1.0.0",
    description: "دریافت آخرین 100 پیام دریافتی",
    contact: {
      name: "پشتیبانی قاصدک",
      email: "support@ghasedak-ict.com",
      url: "https://ghasedak.me"
    }
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "سرور اصلی قاصدک"
    }
  ],
  paths: {
    "/WebService/GetReceivedSmses": {
      get: {
        summary: "100 پیام آخر",
        description: `دریافت لیست آخرین 100 پیام دریافتی.

این متد آخرین پیام‌های دریافتی خط شما را برمی‌گرداند.
می‌توانید پیام‌های خوانده شده یا خوانده نشده را فیلتر کنید.`,
        operationId: "getReceivedSmses",
        tags: ["Inbox", "Received Messages"],
        security: [
          {
            ApiKey: []
          }
        ],
        "x-code-samples": [
          {
            lang: "curl",
            label: "cURL",
            source: `curl -X GET "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses?lineNumber=21*******&isRead=false" \\
  -H "ApiKey: your-api-key-here"`
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
$lineNumber = "21*******";
$isRead = false; // false برای پیام‌های خوانده نشده
$apiKey = "your-api-key-here";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses?lineNumber=" . urlencode($lineNumber) . "&isRead=" . ($isRead ? 'true' : 'false'),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "ApiKey: " . $apiKey
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "خطا: " . $err;
} else {
    $result = json_decode($response, true);
    if ($result['isSuccess']) {
        echo "تعداد پیام‌ها: " . count($result['data']['items']) . "\\n";
        foreach ($result['data']['items'] as $sms) {
            echo "از {$sms['sender']}: {$sms['message']}\\n";
        }
    }
}
?>`
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `const axios = require('axios');

const getReceivedMessages = async (lineNumber, isRead = false) => {
  try {
    const response = await axios.get(
      'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses',
      {
        params: {
          lineNumber: lineNumber,
          isRead: isRead
        },
        headers: {
          'ApiKey': 'your-api-key-here'
        }
      }
    );
    
    if (response.data.isSuccess) {
      console.log(\`تعداد پیام‌ها: \${response.data.data.items.length}\`);
      response.data.data.items.forEach(sms => {
        console.log(\`از \${sms.sender}: \${sms.message}\`);
        console.log(\`تاریخ: \${sms.receiveDate}\`);
      });
      return response.data.data.items;
    }
  } catch (error) {
    console.error('خطا:', error.response?.data || error.message);
  }
};

// استفاده
getReceivedMessages('21*******', false);`
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests

def get_received_messages(line_number, is_read=False):
    """
    دریافت پیام‌های دریافتی
    
    Args:
        line_number: شماره خط
        is_read: True برای پیام‌های خوانده شده، False برای خوانده نشده
    """
    url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses"
    headers = {"ApiKey": "your-api-key-here"}
    params = {
        "lineNumber": line_number,
        "isRead": is_read
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        result = response.json()
        
        if result.get('isSuccess'):
            items = result['data']['items']
            print(f"تعداد پیام‌ها: {len(items)}")
            for sms in items:
                print(f"از {sms['sender']}: {sms['message']}")
                print(f"تاریخ: {sms['receiveDate']}")
            return items
    except requests.exceptions.RequestException as e:
        print(f"خطا: {e}")
        return None

# استفاده
get_received_messages('21*******', False)`
          },
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

public class InboxReader
{
    private static readonly HttpClient client = new HttpClient();
    
    public static async Task GetReceivedMessages(string lineNumber, bool isRead = false)
    {
        var apiKey = "your-api-key-here";
        var url = $"https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses?lineNumber={Uri.EscapeDataString(lineNumber)}&isRead={isRead.ToString().ToLower()}";
        
        client.DefaultRequestHeaders.Clear();
        client.DefaultRequestHeaders.Add("ApiKey", apiKey);
        
        try
        {
            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(responseBody);
            
            if (result.GetProperty("isSuccess").GetBoolean())
            {
                var items = result.GetProperty("data").GetProperty("items");
                Console.WriteLine($"تعداد پیام‌ها: {items.GetArrayLength()}");
                
                foreach (var sms in items.EnumerateArray())
                {
                    Console.WriteLine($"از {sms.GetProperty("sender").GetString()}: {sms.GetProperty("message").GetString()}");
                    Console.WriteLine($"تاریخ: {sms.GetProperty("receiveDate").GetString()}");
                }
            }
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("خطا: " + e.Message);
        }
    }
    
    static async Task Main(string[] args)
    {
        await GetReceivedMessages("21*******", false);
    }
}`
          },
          {
            lang: "java",
            label: "Java",
            source: `import okhttp3.*;
import org.json.JSONObject;
import org.json.JSONArray;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class InboxReader {
    private static final String API_KEY = "your-api-key-here";
    
    public static void main(String[] args) {
        try {
            getReceivedMessages("21*******", false);
        } catch (IOException e) {
            System.err.println("خطا: " + e.getMessage());
        }
    }
    
    public static void getReceivedMessages(String lineNumber, boolean isRead) throws IOException {
        OkHttpClient client = new OkHttpClient();
        
        String encodedLineNumber = URLEncoder.encode(lineNumber, StandardCharsets.UTF_8.toString());
        String url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses?lineNumber=" + encodedLineNumber + "&isRead=" + isRead;
        
        Request request = new Request.Builder()
            .url(url)
            .get()
            .addHeader("ApiKey", API_KEY)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("خطا: " + response);
            
            JSONObject result = new JSONObject(response.body().string());
            if (result.getBoolean("isSuccess")) {
                JSONArray items = result.getJSONObject("data").getJSONArray("items");
                System.out.println("تعداد پیام‌ها: " + items.length());
                
                for (int i = 0; i < items.length(); i++) {
                    JSONObject sms = items.getJSONObject(i);
                    System.out.println("از " + sms.getString("sender") + ": " + sms.getString("message"));
                    System.out.println("تاریخ: " + sms.getString("receiveDate"));
                }
            }
        }
    }
}`
          },
          {
            lang: "go",
            label: "Go",
            source: `package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "net/url"
)

type ReceivedMessage struct {
    Id          int    \`json:"id"\`
    Message     string \`json:"message"\`
    Sender      string \`json:"sender"\`
    LineNumber  string \`json:"lineNumber"\`
    ReceiveDate string \`json:"receiveDate"\`
}

type InboxData struct {
    Items []ReceivedMessage \`json:"items"\`
}

type InboxResponse struct {
    IsSuccess  bool      \`json:"isSuccess"\`
    StatusCode int       \`json:"statusCode"\`
    Message    string    \`json:"message"\`
    Data       InboxData \`json:"data"\`
}

func getReceivedMessages(lineNumber string, isRead bool) error {
    baseURL := "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmses"
    apiKey := "your-api-key-here"
    
    params := url.Values{}
    params.Add("lineNumber", lineNumber)
    params.Add("isRead", fmt.Sprintf("%t", isRead))
    fullURL := baseURL + "?" + params.Encode()
    
    req, err := http.NewRequest("GET", fullURL, nil)
    if err != nil {
        return err
    }
    req.Header.Set("ApiKey", apiKey)
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return err
    }
    
    var result InboxResponse
    if err := json.Unmarshal(body, &result); err != nil {
        return err
    }
    
    if result.IsSuccess {
        fmt.Printf("تعداد پیام‌ها: %d\\n", len(result.Data.Items))
        for _, sms := range result.Data.Items {
            fmt.Printf("از %s: %s\\n", sms.Sender, sms.Message)
            fmt.Printf("تاریخ: %s\\n", sms.ReceiveDate)
        }
    }
    
    return nil
}

func main() {
    if err := getReceivedMessages("21*******", false); err != nil {
        fmt.Printf("خطا: %v\\n", err)
    }
}`
          }
        ],
        parameters: [
          {
            name: "ApiKey",
            in: "header",
            required: true,
            description: "کلید احراز هویت لازم برای دسترسی به فهرست پیام‌های دریافتی.",
            schema: {
              type: "string"
            }
          },
          {
            name: "lineNumber",
            in: "query",
            required: true,
            description: "شماره خط",
            schema: {
              type: "string",
              example: "21*******"
            }
          },
          {
            name: "isRead",
            in: "query",
            required: false,
            description: "اگر (0) وارد شود پیام های خوانده نشده و اگر (1) وارد شود پیام های خوانده شده بر می گردد. در صورت وارد نکردن به صورت پیش فرض (0) می باشد.",
            schema: {
              type: "boolean",
              example: false
            }
          }
        ],
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس"
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت"
                    },
                    message: {
                      type: "string",
                      description: "پیام وضعیت وب سرویس"
                    },
                    data: {
                      type: "object",
                      properties: {
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: {
                                type: "integer",
                                description: "شناسه پیام"
                              },
                              message: {
                                type: "string",
                                description: "متن پیام"
                              },
                              sender: {
                                type: "string",
                                description: "فرستنده"
                              },
                              lineNumber: {
                                type: "string",
                                description: "شماره خط ارسال پیام"
                              },
                              receiveDate: {
                                type: "string",
                                format: "date-time",
                                description: "زمان و تاریخ دریافت پیام"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه پاسخ",
                    value: {
                      isSuccess: true,
                      statusCode: 200,
                      message: "با موفقیت انجام شد",
                      data: {
                        items: [
                          {
                            id: 12345,
                            message: "سلام، این یک پیام تست است",
                            sender: "0919*******",
                            lineNumber: "21*******",
                            receiveDate: "2024-07-02T14:00:34.975Z"
                          },
                          {
                            id: 12346,
                            message: "پیام دوم",
                            sender: "0937*******",
                            lineNumber: "21*******",
                            receiveDate: "2024-07-02T14:05:12.123Z"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "درخواست نامعتبر",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس"
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت"
                    },
                    message: {
                      type: "string",
                      description: "پیام خطا"
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه خطای 400",
                    value: {
                      isSuccess: false,
                      statusCode: 400,
                      message: "پارامترهای ورودی نامعتبر است"
                    }
                  }
                }
              }
            }
          },
          "500": {
            description: "خطای سرور",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس"
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت"
                    },
                    message: {
                      type: "string",
                      description: "پیام خطا"
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه خطای 500",
                    value: {
                      isSuccess: false,
                      statusCode: 500,
                      message: "خطای داخلی سرور"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      ApiKey: {
        type: "apiKey",
        in: "header",
        name: "ApiKey",
        description: "کلید شناسه API"
      }
    }
  }
};
