// Datos centralizados de todos los códigos
export const codigosData = [
    {
        id: 1,
        titulo: 'Configuracion de movimiento de personaje en 2D',
        descripcion: 'La configuracion de un personaje para moverle es fundamental y lo principal muchos juegos, por eso aqui presentamos un codigo simple para configurar tu personaje.',
        categoria: 'Movimiento',
        fecha: 'Oct 12, 2025',
        autor: 'codeGodot',
        likes: 42,
        guardados: 15,
        codigo: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`
    },
    {
        id: 2,
        titulo: 'Interacion personaje con puertas',
        descripcion: 'Sistema de interacción que permite al jugador abrir puertas al presionar una tecla. Incluye detección de colisiones y señales para comunicarse con otros objetos del juego.',
        categoria: 'Interacción',
        fecha: 'Sep 28, 2025',
        autor: 'Marcus Johnson',
        likes: 38,
        guardados: 12,
        codigo: `extends Area2D

signal door_opened

func _ready():
    connect("body_entered", self, "_on_body_entered")

func _on_body_entered(body):
    if body.is_in_group("player"):
        if Input.is_action_just_pressed("interact"):
            open_door()

func open_door():
    emit_signal("door_opened")
    print("¡Puerta abierta!")`
    },
    {
        id: 3,
        titulo: 'Ciclo día/noche',
        descripcion: 'Implementa un sistema dinámico de día y noche que cambia automáticamente la iluminación del juego. Perfecto para crear atmósferas inmersivas y mecánicas temporales.',
        categoria: 'Mundo',
        fecha: 'Oct 5, 2025',
        autor: 'Elena Wong',
        likes: 56,
        guardados: 23,
        codigo: `extends Node2D

var day_duration = 60.0  # duración del día en segundos
var time_of_day = 0.0

func _ready():
    set_process(true)

func _process(delta):
    time_of_day += delta / day_duration
    if time_of_day >= 1.0:
        time_of_day = 0.0
    
    update_lighting()

func update_lighting():
    var light_level = sin(time_of_day * PI)
    modulate.a = max(0.2, light_level)`
    },
    {
        id: 4,
        titulo: 'Generacion de enemigos basico',
        descripcion: 'Sistema automático de generación de enemigos con intervalos de tiempo configurables. Spawnnea enemigos en posiciones aleatorias para crear desafíos constantes al jugador.',
        categoria: 'Combate',
        fecha: 'Ene 16, 2025',
        autor: 'codeGodot',
        likes: 67,
        guardados: 31,
        codigo: `extends Node2D

var enemy_scene = preload("res://Enemy.tscn")
var spawn_timer = 0.0
var spawn_interval = 3.0

func _process(delta):
    spawn_timer += delta
    if spawn_timer >= spawn_interval:
        spawn_enemy()
        spawn_timer = 0.0

func spawn_enemy():
    var enemy = enemy_scene.instance()
    enemy.global_position = get_random_spawn_position()
    get_tree().current_scene.add_child(enemy)

func get_random_spawn_position():
    var x = randf() * 800
    var y = randf() * 600
    return Vector2(x, y)`
    },
    {
        id: 5,
        titulo: 'Zoom dinámico',
        descripcion: 'Control de cámara con zoom suave usando la rueda del mouse. Incluye límites configurables de zoom máximo y mínimo para mantener una experiencia de juego equilibrada.',
        categoria: 'Cámara',
        fecha: 'Mar 1, 2025',
        autor: 'codeGodot',
        likes: 44,
        guardados: 18,
        codigo: `extends Camera2D

var zoom_speed = 2.0
var min_zoom = 0.5
var max_zoom = 2.0

func _input(event):
    if event is InputEventMouseButton:
        if event.button_index == BUTTON_WHEEL_UP:
            zoom_in()
        elif event.button_index == BUTTON_WHEEL_DOWN:
            zoom_out()

func zoom_in():
    zoom = zoom * 1.1
    zoom = Vector2(min(zoom.x, max_zoom), min(zoom.y, max_zoom))

func zoom_out():
    zoom = zoom * 0.9
    zoom = Vector2(max(zoom.x, min_zoom), max(zoom.y, min_zoom))`
    },
    {
        id: 6,
        titulo: 'Musica segun interacciones',
        descripcion: 'Sistema de audio dinámico que cambia la música de fondo según las acciones del jugador. Incluye transiciones suaves entre diferentes pistas musicales.',
        categoria: 'Audio',
        fecha: 'Feb 12, 2025',
        autor: 'codeGodot',
        likes: 51,
        guardados: 22,
        codigo: `extends AudioStreamPlayer2D

var music_tracks = []
var current_track = 0

func _ready():
    music_tracks.append(preload("res://music/battle.ogg"))
    music_tracks.append(preload("res://music/peaceful.ogg"))

func change_music_on_interaction(interaction_type):
    match interaction_type:
        "battle":
            play_track(0)
        "peaceful":
            play_track(1)

func play_track(track_index):
    if track_index < music_tracks.size():
        stream = music_tracks[track_index]
        play()`
    },
    {
        id: 7,
        titulo: 'Menu de inicio',
        descripcion: 'Interfaz de menú principal completa con botones para iniciar juego, configuraciones y salir. Incluye navegación entre escenas y gestión de eventos de botones.',
        categoria: 'UI / Interfaz',
        fecha: 'Jul 30, 2025',
        autor: 'codeGodot',
        likes: 39,
        guardados: 16,
        codigo: `extends Control

onready var start_button = $VBox/StartButton
onready var options_button = $VBox/OptionsButton
onready var quit_button = $VBox/QuitButton

func _ready():
    start_button.connect("pressed", self, "_on_start_pressed")
    options_button.connect("pressed", self, "_on_options_pressed")
    quit_button.connect("pressed", self, "_on_quit_pressed")

func _on_start_pressed():
    get_tree().change_scene("res://Game.tscn")

func _on_options_pressed():
    get_tree().change_scene("res://Options.tscn")

func _on_quit_pressed():
    get_tree().quit()`
    },
    {
        id: 8,
        titulo: 'Sistema de inventario básico',
        descripcion: 'Implementación simple de un inventario que permite agregar, eliminar y mostrar items. Incluye slots de inventario con límite de capacidad.',
        categoria: 'Inventario',
        fecha: 'Ago 15, 2025',
        autor: 'Sarah Chen',
        likes: 73,
        guardados: 34,
        codigo: `extends Node

var inventory = []
var max_slots = 20

func add_item(item):
    if inventory.size() < max_slots:
        inventory.append(item)
        print("Item agregado: ", item)
        return true
    else:
        print("Inventario lleno")
        return false

func remove_item(item):
    var index = inventory.find(item)
    if index != -1:
        inventory.remove(index)
        print("Item eliminado: ", item)
        return true
    return false

func get_inventory():
    return inventory`
    },
    {
        id: 9,
        titulo: 'Efectos de partículas al saltar',
        descripcion: 'Sistema de partículas que se activa cuando el personaje salta. Añade feedback visual atractivo a las acciones del jugador.',
        categoria: 'Efectos',
        fecha: 'Sep 3, 2025',
        autor: 'codeGodot',
        likes: 48,
        guardados: 19,
        codigo: `extends CharacterBody2D

onready var jump_particles = $JumpParticles

func _physics_process(delta):
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY
        emit_jump_particles()
    
    move_and_slide()

func emit_jump_particles():
    jump_particles.emitting = true
    jump_particles.restart()`
    },
    {
        id: 10,
        titulo: 'Checkpoint de guardado',
        descripcion: 'Sistema de checkpoints que guarda la posición del jugador. Permite reaparecer en el último checkpoint tocado al morir.',
        categoria: 'Guardado',
        fecha: 'Oct 8, 2025',
        autor: 'Alex Rivera',
        likes: 62,
        guardados: 28,
        codigo: `extends Area2D

var checkpoint_position = Vector2.ZERO
var is_activated = false

func _ready():
    connect("body_entered", self, "_on_body_entered")

func _on_body_entered(body):
    if body.is_in_group("player") and not is_activated:
        activate_checkpoint(body.global_position)

func activate_checkpoint(pos):
    checkpoint_position = pos
    is_activated = true
    modulate = Color(0, 1, 0)
    print("Checkpoint activado!")`
    },
    {
        id: 11,
        titulo: 'Barra de vida animada',
        descripcion: 'Barra de HP con animación suave al recibir daño o curar. Incluye interpolación para transiciones fluidas y cambio de color según porcentaje.',
        categoria: 'UI / Interfaz',
        fecha: 'Nov 12, 2025',
        autor: 'codeGodot',
        likes: 55,
        guardados: 25,
        codigo: `extends ProgressBar

var health = 100
var max_health = 100

func _ready():
    max_value = max_health
    value = health

func take_damage(amount):
    health -= amount
    health = clamp(health, 0, max_health)
    update_health_bar()

func heal(amount):
    health += amount
    health = clamp(health, 0, max_health)
    update_health_bar()

func update_health_bar():
    var tween = create_tween()
    tween.tween_property(self, "value", health, 0.3)
    update_color()

func update_color():
    if health < max_health * 0.3:
        modulate = Color(1, 0, 0)
    elif health < max_health * 0.6:
        modulate = Color(1, 1, 0)
    else:
        modulate = Color(0, 1, 0)`
    },
    {
        id: 12,
        titulo: 'Plataformas móviles',
        descripcion: 'Plataformas que se mueven entre puntos definidos. El jugador se mueve junto con la plataforma de manera suave y realista.',
        categoria: 'Movimiento',
        fecha: 'Dic 5, 2025',
        autor: 'Jake Morrison',
        likes: 41,
        guardados: 17,
        codigo: `extends KinematicBody2D

export var speed = 100.0
export var move_to = Vector2(200, 0)

var start_position = Vector2.ZERO
var direction = 1

func _ready():
    start_position = global_position

func _physics_process(delta):
    var distance = move_to * direction
    var velocity = distance.normalized() * speed
    
    move_and_slide(velocity)
    
    if global_position.distance_to(start_position + move_to) < 5:
        direction = -1
    elif global_position.distance_to(start_position) < 5:
        direction = 1`
    },
    {
        id: 13,
        titulo: 'Sistema de diálogos',
        descripcion: 'Sistema completo de diálogos con texto que aparece letra por letra. Incluye opciones de diálogo y manejo de conversaciones.',
        categoria: 'UI / Interfaz',
        fecha: 'Ene 20, 2026',
        autor: 'Maria Santos',
        likes: 89,
        guardados: 42,
        codigo: `extends Control

onready var text_label = $Panel/Label
onready var timer = $Timer

var dialogue = []
var current_line = 0
var char_index = 0

func start_dialogue(lines):
    dialogue = lines
    current_line = 0
    show_next_line()

func show_next_line():
    if current_line < dialogue.size():
        text_label.text = ""
        char_index = 0
        timer.start(0.05)
    else:
        end_dialogue()

func _on_Timer_timeout():
    if char_index < dialogue[current_line].length():
        text_label.text += dialogue[current_line][char_index]
        char_index += 1
    else:
        timer.stop()

func next_line():
    current_line += 1
    show_next_line()`
    },
    {
        id: 14,
        titulo: 'Detección de colisiones mejorada',
        descripcion: 'Sistema avanzado de detección de colisiones con raycast. Permite detectar objetos específicos y obtener información detallada del contacto.',
        categoria: 'Física',
        fecha: 'Feb 14, 2026',
        autor: 'codeGodot',
        likes: 37,
        guardados: 14,
        codigo: `extends RayCast2D

func _physics_process(delta):
    if is_colliding():
        var collider = get_collider()
        var collision_point = get_collision_point()
        var collision_normal = get_collision_normal()
        
        if collider.is_in_group("enemies"):
            handle_enemy_collision(collider)
        elif collider.is_in_group("items"):
            handle_item_collision(collider)

func handle_enemy_collision(enemy):
    print("Colisión con enemigo: ", enemy.name)

func handle_item_collision(item):
    print("Item detectado: ", item.name)`
    },
    {
        id: 15,
        titulo: 'Disparo automático',
        descripcion: 'Sistema de disparo automático con cooldown. El arma dispara proyectiles continuamente mientras se mantiene presionado el botón.',
        categoria: 'Combate',
        fecha: 'Mar 8, 2026',
        autor: 'Tom Bradley',
        likes: 68,
        guardados: 30,
        codigo: `extends Node2D

var bullet_scene = preload("res://Bullet.tscn")
var fire_rate = 0.2
var can_shoot = true

func _process(delta):
    if Input.is_action_pressed("shoot") and can_shoot:
        shoot()

func shoot():
    can_shoot = false
    var bullet = bullet_scene.instance()
    bullet.global_position = global_position
    bullet.rotation = rotation
    get_tree().current_scene.add_child(bullet)
    
    yield(get_tree().create_timer(fire_rate), "timeout")
    can_shoot = true`
    },
    {
        id: 16,
        titulo: 'Paralaje de fondo',
        descripcion: 'Efecto de paralaje para fondos multicapa. Crea profundidad visual moviendo capas a diferentes velocidades según la cámara.',
        categoria: 'Mundo',
        fecha: 'Abr 18, 2026',
        autor: 'Nina Park',
        likes: 52,
        guardados: 21,
        codigo: `extends ParallaxBackground

export var scroll_speed = Vector2(50, 0)

func _process(delta):
    scroll_offset += scroll_speed * delta

func set_camera_position(camera_pos):
    for layer in get_children():
        if layer is ParallaxLayer:
            var motion = layer.motion_scale
            layer.motion_offset = camera_pos * (1 - motion)`
    }
]
