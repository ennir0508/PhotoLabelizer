// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[derive(serde::Serialize, Debug)]
struct Entry {
    id: i32,
    path: String,
    recommend_name: String,
}

#[derive(serde::Serialize)]
struct GenerateCaptionResponse {
    status: u16,
    message: String,
    result: Vec<Entry>,
}

#[derive(serde::Serialize)]
struct PostFilenameResponse {
    status: u16,
    message: String,
}

#[tauri::command]
fn greet() {
    println!("Hello World!");
}

#[tauri::command]
fn get_filename_by_ai(file_path_list: Vec<String>) -> Result<GenerateCaptionResponse, String> {
    let result = true;

    let new_file_list: Vec<Entry> = file_path_list
        .iter()
        .map(|s| Entry {
            id: 1,
            path: s.clone(),
            recommend_name: s.clone(),
        })
        .collect();

    if result {
        Ok(GenerateCaptionResponse {
            status: 200,
            message: "Success".to_string(),
            result: new_file_list,
        })
    } else {
        Err("Error".to_string())
    }
}

#[tauri::command]
fn post_filename(file_path_list: Vec<String>) -> Result<PostFilenameResponse, String> {
    let result = true;
    let mut index: i16 = 0;

    for item in file_path_list {
        println!("file path list [{}]: {}", index, item);
        index += 1;
    }

    if result {
        Ok(PostFilenameResponse {
            status: 200,
            message: "Success: post_filename".to_string(),
        })
    } else {
        Err("Error: post_filename".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            get_filename_by_ai,
            post_filename
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
