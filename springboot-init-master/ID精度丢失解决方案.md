# ID精度丢失问题解决方案

## 问题描述
在前后端通信过程中，由于JavaScript的Number类型精度限制（IEEE 754双精度浮点数最大安全整数为2^53-1），当数据库ID值较大时会发生精度丢失。

## 问题原因
- 数据库使用雪花算法生成的Long类型ID（64位）
- JavaScript Number类型只能安全表示53位整数
- 当ID值超过9007199254740991时会丢失精度

## 解决方案

### 1. 后端实体类序列化配置 ✅
在所有实体类的Long类型ID字段上添加序列化注解：
```java
@JsonSerialize(using = ToStringSerializer.class)
private Long id;
```

### 2. VO类序列化配置 ✅
为返回给前端的VO类添加序列化配置：
- UserVO
- CourseSelectionVO
- 其他包含Long类型ID的VO类

### 3. DTO类配置 ✅
为请求类中的ID字段添加序列化配置：
- DeleteRequest
- 其他包含Long类型ID的请求类

### 4. 全局Jackson配置 ✅
创建全局配置类，确保所有Long类型字段都序列化为字符串：
```java
@Configuration
public class JacksonConfig {
    @Bean
    @Primary
    public ObjectMapper jacksonObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule simpleModule = new SimpleModule();
        
        // 全局配置Long类型序列化为String
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        
        objectMapper.registerModule(simpleModule);
        return objectMapper;
    }
}
```

### 5. 前端类型定义 ✅
前端类型定义已正确将所有ID字段定义为string类型：
```typescript
type User = {
  id?: string;  // 正确：使用string类型
  // ...其他字段
}
```

## 验证方法

### 后端验证
1. 查看JSON响应，确认ID字段为字符串格式：
```json
{
  "id": "1234567890123456789",  // 字符串格式
  "name": "测试用户"
}
```

### 前端验证
1. 在浏览器控制台检查接收到的数据
2. 确认ID值能够完整保持，不会出现精度丢失

## 注意事项
1. 所有新增的实体类都需要在Long类型ID字段上添加@JsonSerialize注解
2. 前端处理ID时始终使用字符串类型，避免转换为数字
3. 数据库查询时使用字符串ID进行比较和查询

## 相关文件
- 实体类：`src/main/java/com/yupi/project/model/entity/*.java`
- VO类：`src/main/java/com/yupi/project/model/vo/*.java`
- DTO类：`src/main/java/com/yupi/project/model/dto/**/*.java`
- 配置类：`src/main/java/com/yupi/project/config/JacksonConfig.java`
- 前端类型：`yupi-antd-frontend-init-master/src/services/backend/typings.d.ts` 