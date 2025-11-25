export const paginatedApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "صفحه بندی پیام های دریافتی - Ghasedak SMS API",
    version: "1.0.0",
    description: "دریافت پیام های دریافتی به صورت صفحه بندی شده",
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
    "/WebService/GetReceivedSmsesPaging": {
      get: {
        summary: "صفحه بندی پیام های دریافتی",
        description: `دریافت لیست پیام های دریافتی به صورت صفحه بندی.

در این متد حداکثر 200 پیام در هر صفحه بازگردانده می شود.
می‌توانید با استفاده از فیلترهای مختلف، پیام‌های مورد نظر خود را دریافت کنید.`,
        operationId: "getReceivedSmsesPaging",
        tags: ["Inbox", "Pagination"],
        security: [
          {
            ApiKey: []
          }
        ],
        "x-code-samples": [
          {
            lang: "curl",
            label: "cURL",
            source: `curl -X GET "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?lineNumber=21*******&isRead=true&startDate=2024-01-01&endDate=2024-02-02&pageIndex=1&pageSize=10" \\
  -H "ApiKey: your-api-key-here"`
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
$lineNumber = "21*******";
$isRead = true;
$startDate = "2024-01-01";
$endDate = "2024-02-02";
$pageIndex = 1;
$pageSize = 10;
$apiKey = "your-api-key-here";

$curl = curl_init();

$params = http_build_query([
    'lineNumber' => $lineNumber,
    'isRead' => $isRead,
    'startDate' => $startDate,
    'endDate' => $endDate,
    'pageIndex' => $pageIndex,
    'pageSize' => $pageSize
]);

curl_setopt_array($curl, [
    CURLOPT_URL => "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?" . $params,
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
        $data = $result['data'];
        echo "صفحه {$data['pageIndex']} از {$data['totalPages']}\\n";
        echo "تعداد کل: {$data['totalCount']}\\n";
        foreach ($data['items'] as $sms) {
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

const getReceivedMessagesPaging = async (options) => {
  const {
    lineNumber,
    isRead = false,
    startDate = null,
    endDate = null,
    pageIndex = 1,
    pageSize = 10
  } = options;

  try {
    const response = await axios.get(
      'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging',
      {
        params: {
          lineNumber,
          isRead,
          startDate,
          endDate,
          pageIndex,
          pageSize
        },
        headers: {
          'ApiKey': 'your-api-key-here'
        }
      }
    );
    
    if (response.data.isSuccess) {
      const data = response.data.data;
      console.log(\`صفحه \${data.pageIndex} از \${data.totalPages}\`);
      console.log(\`تعداد کل: \${data.totalCount}\`);
      console.log(\`صفحه قبلی: \${data.hasPreviousPage}\`);
      console.log(\`صفحه بعدی: \${data.hasNextPage}\`);
      
      data.items.forEach(sms => {
        console.log(\`از \${sms.sender}: \${sms.message}\`);
      });
      
      return data;
    }
  } catch (error) {
    console.error('خطا:', error.response?.data || error.message);
  }
};

// استفاده
getReceivedMessagesPaging({
  lineNumber: '21*******',
  isRead: true,
  startDate: '2024-01-01',
  endDate: '2024-02-02',
  pageIndex: 1,
  pageSize: 10
});`
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests
from datetime import datetime

def get_received_messages_paging(
    line_number,
    is_read=False,
    start_date=None,
    end_date=None,
    page_index=1,
    page_size=10
):
    """
    دریافت پیام‌های دریافتی به صورت صفحه‌بندی
    
    Args:
        line_number: شماره خط
        is_read: True برای پیام‌های خوانده شده
        start_date: تاریخ شروع (YYYY-MM-DD)
        end_date: تاریخ پایان (YYYY-MM-DD)
        page_index: شماره صفحه (از 1 شروع می‌شود)
        page_size: تعداد آیتم در هر صفحه (حداکثر 200)
    """
    url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging"
    headers = {"ApiKey": "your-api-key-here"}
    
    params = {
        "lineNumber": line_number,
        "isRead": is_read,
        "pageIndex": page_index,
        "pageSize": page_size
    }
    
    if start_date:
        params["startDate"] = start_date
    if end_date:
        params["endDate"] = end_date
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        result = response.json()
        
        if result.get('isSuccess'):
            data = result['data']
            print(f"صفحه {data['pageIndex']} از {data['totalPages']}")
            print(f"تعداد کل: {data['totalCount']}")
            print(f"صفحه قبلی: {data['hasPreviousPage']}")
            print(f"صفحه بعدی: {data['hasNextPage']}")
            
            for sms in data['items']:
                print(f"از {sms['sender']}: {sms['message']}")
            
            return data
    except requests.exceptions.RequestException as e:
        print(f"خطا: {e}")
        return None

# استفاده
get_received_messages_paging(
    line_number='21*******',
    is_read=True,
    start_date='2024-01-01',
    end_date='2024-02-02',
    page_index=1,
    page_size=10
)`
          },
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Web;

public class InboxPagingReader
{
    private static readonly HttpClient client = new HttpClient();
    
    public static async Task GetReceivedMessagesPaging(
        string lineNumber,
        bool isRead = false,
        string startDate = null,
        string endDate = null,
        int pageIndex = 1,
        int pageSize = 10)
    {
        var apiKey = "your-api-key-here";
        var queryParams = HttpUtility.ParseQueryString(string.Empty);
        
        queryParams["lineNumber"] = lineNumber;
        queryParams["isRead"] = isRead.ToString().ToLower();
        queryParams["pageIndex"] = pageIndex.ToString();
        queryParams["pageSize"] = pageSize.ToString();
        
        if (!string.IsNullOrEmpty(startDate))
            queryParams["startDate"] = startDate;
        if (!string.IsNullOrEmpty(endDate))
            queryParams["endDate"] = endDate;
        
        var url = $"https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?{queryParams}";
        
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
                var data = result.GetProperty("data");
                Console.WriteLine($"صفحه {data.GetProperty("pageIndex").GetInt32()} از {data.GetProperty("totalPages").GetInt32()}");
                Console.WriteLine($"تعداد کل: {data.GetProperty("totalCount").GetInt32()}");
                
                foreach (var sms in data.GetProperty("items").EnumerateArray())
                {
                    Console.WriteLine($"از {sms.GetProperty("sender").GetString()}: {sms.GetProperty("message").GetString()}");
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
        await GetReceivedMessagesPaging(
            lineNumber: "21*******",
            isRead: true,
            startDate: "2024-01-01",
            endDate: "2024-02-02",
            pageIndex: 1,
            pageSize: 10
        );
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

public class InboxPagingReader {
    private static final String API_KEY = "your-api-key-here";
    
    public static void main(String[] args) {
        try {
            getReceivedMessagesPaging(
                "21*******",
                true,
                "2024-01-01",
                "2024-02-02",
                1,
                10
            );
        } catch (IOException e) {
            System.err.println("خطا: " + e.getMessage());
        }
    }
    
    public static void getReceivedMessagesPaging(
        String lineNumber,
        boolean isRead,
        String startDate,
        String endDate,
        int pageIndex,
        int pageSize
    ) throws IOException {
        OkHttpClient client = new OkHttpClient();
        
        StringBuilder urlBuilder = new StringBuilder("https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?");
        urlBuilder.append("lineNumber=").append(URLEncoder.encode(lineNumber, StandardCharsets.UTF_8.toString()));
        urlBuilder.append("&isRead=").append(isRead);
        urlBuilder.append("&pageIndex=").append(pageIndex);
        urlBuilder.append("&pageSize=").append(pageSize);
        
        if (startDate != null) {
            urlBuilder.append("&startDate=").append(URLEncoder.encode(startDate, StandardCharsets.UTF_8.toString()));
        }
        if (endDate != null) {
            urlBuilder.append("&endDate=").append(URLEncoder.encode(endDate, StandardCharsets.UTF_8.toString()));
        }
        
        Request request = new Request.Builder()
            .url(urlBuilder.toString())
            .get()
            .addHeader("ApiKey", API_KEY)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("خطا: " + response);
            
            JSONObject result = new JSONObject(response.body().string());
            if (result.getBoolean("isSuccess")) {
                JSONObject data = result.getJSONObject("data");
                System.out.println("صفحه " + data.getInt("pageIndex") + " از " + data.getInt("totalPages"));
                System.out.println("تعداد کل: " + data.getInt("totalCount"));
                
                JSONArray items = data.getJSONArray("items");
                for (int i = 0; i < items.length(); i++) {
                    JSONObject sms = items.getJSONObject(i);
                    System.out.println("از " + sms.getString("sender") + ": " + sms.getString("message"));
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

type PagingData struct {
    PageIndex       int               \`json:"pageIndex"\`
    PageSize        int               \`json:"pageSize"\`
    TotalCount      int               \`json:"totalCount"\`
    TotalPages      int               \`json:"totalPages"\`
    HasPreviousPage bool              \`json:"hasPreviousPage"\`
    HasNextPage     bool              \`json:"hasNextPage"\`
    Items           []ReceivedMessage \`json:"items"\`
}

type PagingResponse struct {
    IsSuccess  bool        \`json:"isSuccess"\`
    StatusCode int         \`json:"statusCode"\`
    Message    string      \`json:"message"\`
    Data       PagingData  \`json:"data"\`
}

func getReceivedMessagesPaging(
    lineNumber string,
    isRead bool,
    startDate string,
    endDate string,
    pageIndex int,
    pageSize int,
) error {
    baseURL := "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging"
    apiKey := "your-api-key-here"
    
    params := url.Values{}
    params.Add("lineNumber", lineNumber)
    params.Add("isRead", fmt.Sprintf("%t", isRead))
    params.Add("pageIndex", fmt.Sprintf("%d", pageIndex))
    params.Add("pageSize", fmt.Sprintf("%d", pageSize))
    
    if startDate != "" {
        params.Add("startDate", startDate)
    }
    if endDate != "" {
        params.Add("endDate", endDate)
    }
    
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
    
    var result PagingResponse
    if err := json.Unmarshal(body, &result); err != nil {
        return err
    }
    
    if result.IsSuccess {
        data := result.Data
        fmt.Printf("صفحه %d از %d\\n", data.PageIndex, data.TotalPages)
        fmt.Printf("تعداد کل: %d\\n", data.TotalCount)
        fmt.Printf("صفحه قبلی: %t, صفحه بعدی: %t\\n", data.HasPreviousPage, data.HasNextPage)
        
        for _, sms := range data.Items {
            fmt.Printf("از %s: %s\\n", sms.Sender, sms.Message)
        }
    }
    
    return nil
}

func main() {
    if err := getReceivedMessagesPaging(
        "21*******",
        true,
        "2024-01-01",
        "2024-02-02",
        1,
        10,
    ); err != nil {
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
            description: "کلید احراز هویت لازم برای دریافت پیام‌های صفحه‌بندی شده.",
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
              example: true
            }
          },
          {
            name: "startDate",
            in: "query",
            required: false,
            description: "تاریخ و زمان دقیق شروع ارسال پیام",
            schema: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00Z"
            }
          },
          {
            name: "endDate",
            in: "query",
            required: false,
            description: "تاریخ و زمان دقیق پایان ارسال پیام",
            schema: {
              type: "string",
              format: "date-time",
              example: "2024-02-02T00:00:00Z"
            }
          },
          {
            name: "pageIndex",
            in: "query",
            required: false,
            description: "صفحه مورد نظر را وارد کنید، صفحه اول 1 می باشد.",
            schema: {
              type: "integer",
              example: 1
            }
          },
          {
            name: "pageSize",
            in: "query",
            required: false,
            description: "تعداد پیام بازگشتی در هر صفحه، حداکثر تعداد 200 می باشد.",
            schema: {
              type: "integer",
              example: 10
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
                        pageIndex: {
                          type: "integer",
                          description: "شماره صفحه"
                        },
                        pageSize: {
                          type: "integer",
                          description: "تعداد آیتم های موجود در جدول"
                        },
                        totalCount: {
                          type: "integer",
                          description: "تعداد کل آیتم ها"
                        },
                        totalPages: {
                          type: "integer",
                          description: "تعداد کل صفحات"
                        },
                        hasPreviousPage: {
                          type: "boolean",
                          description: "وجود صفحه قبلی"
                        },
                        hasNextPage: {
                          type: "boolean",
                          description: "وجود صفحه بعدی"
                        },
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
                        pageIndex: 1,
                        pageSize: 10,
                        totalCount: 45,
                        totalPages: 5,
                        hasPreviousPage: false,
                        hasNextPage: true,
                        items: [
                          {
                            id: 12345,
                            message: "سلام، این یک پیام تست است",
                            sender: "0919*******",
                            lineNumber: "21*******",
                            receiveDate: "2024-07-02T14:00:34.975Z"
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
